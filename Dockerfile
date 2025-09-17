# Albert Heijn Self-Scanner Docker Image
FROM python:3.12-slim AS production

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Create non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup app

# Change ownership of app directory
RUN chown -R app:appgroup /app

# Expose port 8000
EXPOSE 8000

# Switch to non-root user
USER app

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8000')" || exit 1

# Start the Python HTTP server
CMD ["python3", "-m", "http.server", "8000"]