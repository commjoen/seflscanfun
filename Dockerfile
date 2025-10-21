# Albert Heijn Self-Scanner Docker Image - using Node.js instead of Python
FROM node:25-alpine AS production

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Create non-root user (Alpine uses addgroup/adduser)
RUN addgroup -g 1001 -S appgroup && \
    adduser -S app -u 1001 -G appgroup

# Change ownership of app directory
RUN chown -R app:appgroup /app

# Expose port 8000
EXPOSE 8000

# Switch to non-root user
USER app

# Health check using node HTTP request (no wget needed)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the Node.js Express server
CMD ["node", "server.js"]