#!/usr/bin/env bash
# ==============================================================================
# Luxury Machupicchu Peru - Automated MySQL Database Backup Script
# Retention Policy: 14 Days
# ==============================================================================
set -euo pipefail

# 1. Configuration & Defaults
DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-luxury_machupicchu_db}"
DB_USER="${SERVICE_USER_MYSQL:-${DB_USER:-root}}"
DB_PASSWORD="${SERVICE_PASSWORD_ROOT:-${SERVICE_PASSWORD_MYSQL:-${DB_PASSWORD:-}}}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${BACKUP_DIR:-${SCRIPT_DIR}/../backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"

TIMESTAMP="$(date +"%Y%m%d_%H%M%S")"
BACKUP_FILENAME="${DB_NAME}_${TIMESTAMP}.sql.gz"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILENAME}"

echo "================================================================="
echo "✦ Luxury Machupicchu Peru - Database Backup Routine"
echo "  Timestamp:    $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
echo "  Target DB:    ${DB_NAME} on ${DB_HOST}:${DB_PORT}"
echo "  Destination:  ${BACKUP_PATH}"
echo "  Retention:    ${RETENTION_DAYS} days"
echo "================================================================="

mkdir -p "${BACKUP_DIR}"

# 2. Execute Dump with Compression
echo "--> Initiating compressed database dump..."

# Check if running via Docker container or direct mysqldump
if command -v mysqldump &> /dev/null; then
    MYSQL_PWD="${DB_PASSWORD}" mysqldump \
        --host="${DB_HOST}" \
        --port="${DB_PORT}" \
        --user="${DB_USER}" \
        --single-transaction \
        --quick \
        --routines \
        --triggers \
        --default-character-set=utf8mb4 \
        "${DB_NAME}" | gzip -9 > "${BACKUP_PATH}"
else
    # Fallback to docker exec if mysqldump is not in host PATH
    CONTAINER_ID="$(docker ps --filter "name=db" --format "{{.ID}}" | head -n 1)"
    if [ -n "${CONTAINER_ID}" ]; then
        echo "--> mysqldump not found locally; executing via Docker container ${CONTAINER_ID}..."
        docker exec -i -e MYSQL_PWD="${DB_PASSWORD}" "${CONTAINER_ID}" \
            mysqldump -u "${DB_USER}" \
            --single-transaction \
            --quick \
            --routines \
            --triggers \
            --default-character-set=utf8mb4 \
            "${DB_NAME}" | gzip -9 > "${BACKUP_PATH}"
    else
        echo "ERROR: Neither 'mysqldump' nor a running 'db' Docker container was found." >&2
        exit 1
    fi
fi

# 3. Verify Dump Integrity
if [ -s "${BACKUP_PATH}" ]; then
    BACKUP_SIZE="$(du -h "${BACKUP_PATH}" | cut -f1)"
    echo "✓ Backup created successfully: ${BACKUP_FILENAME} (${BACKUP_SIZE})"
else
    echo "ERROR: Backup file was created but is empty or corrupt." >&2
    exit 1
fi

# 4. Enforce 14-Day Retention Policy
echo "--> Cleaning up backups older than ${RETENTION_DAYS} days..."
REMOVED_COUNT=0
while IFS= read -r file; do
    if [ -n "$file" ]; then
        echo "    Removing obsolete backup: $(basename "$file")"
        rm -f "$file"
        REMOVED_COUNT=$((REMOVED_COUNT + 1))
    fi
done < <(find "${BACKUP_DIR}" -type f -name "${DB_NAME}_*.sql.gz" -mtime +"${RETENTION_DAYS}" 2>/dev/null || true)

echo "✓ Retention policy applied. Obsolete backups deleted: ${REMOVED_COUNT}"
echo "✦ Backup routine completed successfully."
exit 0
