#!/bin/sh

# Loop through all index.html files and replace environment variables with their values
for file in /usr/share/nginx/html/index.html; do
  if [ -f "$file" ]; then
    echo "Injecting environment variables into $file..."

    # Use envsubst to replace environment variables in the format you need
    envsubst '
      \$VITE_API_URL
      \$VITE_AZURE_APP_ID
      \$VITE_AZURE_LOCATAIRE_ID
      \$VITE_AZURE_API_APP_ID
    ' < "$file" > "$file.tmp" && mv "$file.tmp" "$file"

    # Inject environment variables into window.env
    sed -i 's|<\/head>|<script>window.env = { VITE_API_URL: "'$VITE_API_URL'", VITE_AZURE_APP_ID: "'$VITE_AZURE_APP_ID'", VITE_AZURE_LOCATAIRE_ID: "'$VITE_AZURE_LOCATAIRE_ID'", VITE_AZURE_API_APP_ID: "'$VITE_AZURE_API_APP_ID'" };</script></head>|' "$file"
  fi
done

# Execute the passed command (start nginx)
exec "$@"