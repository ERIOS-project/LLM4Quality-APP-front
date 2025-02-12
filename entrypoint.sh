#!/bin/sh

# Remplacer les variables dans index.html
for file in /usr/share/nginx/html/index.html; do
  if [ -f "$file" ]; then
    echo "Injecting environment variables into $file..."
    envsubst '\$VITE_AZURE_APP_ID \$VITE_AZURE_LOCATAIRE_ID \$VITE_AZURE_API_APP_ID \$VITE_API_URL' < "$file" > "$file.tmp" \
      && mv "$file.tmp" "$file"
  fi
done

exec "$@"
