# Docker Support voor Albert Heijn Zelfscanner

Dit document beschrijft hoe je de Albert Heijn Zelfscanner Simulatie kunt draaien met Docker.

## Quick Start

### Docker Hub gebruiken (aanbevolen)
```bash
# Pull en start de applicatie
docker run -p 8000:8000 ghcr.io/commjoen/seflscanfun:latest

# Open je browser op http://localhost:8000
```

### Lokaal bouwen
```bash
# Clone repository
git clone https://github.com/commjoen/seflscanfun.git
cd seflscanfun

# Bouw Docker image
docker build -t seflscanfun .

# Start container
docker run -p 8000:8000 seflscanfun
```

## Beschikbare Tags

- `latest` - Nieuwste stabiele versie van main branch
- `v1.x.x` - Specifieke release versies
- `main` - Nieuwste ontwikkeling van main branch
- `pr-123` - Pull request builds voor testing

## Docker Compose

Voor ontwikkeling kun je Docker Compose gebruiken:

```yaml
version: '3.8'
services:
  seflscanfun:
    image: ghcr.io/commjoen/seflscanfun:latest
    ports:
      - "8000:8000"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "python3", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000')"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Opslaan als `docker-compose.yml` en draaien met:
```bash
docker-compose up -d
```

## Configuratie

### Environment Variables
Momenteel geen configuratie nodig - de applicatie draait out-of-the-box.

### Volumes
De applicatie is volledig stateless, geen volumes nodig.

### Netwerk
- **Poort**: 8000 (HTTP)
- **Protocol**: HTTP
- **Health Check**: `GET /` verwacht `200 OK`

## Productie Deployment

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: seflscanfun
spec:
  replicas: 2
  selector:
    matchLabels:
      app: seflscanfun
  template:
    metadata:
      labels:
        app: seflscanfun
    spec:
      containers:
      - name: seflscanfun
        image: ghcr.io/commjoen/seflscanfun:latest
        ports:
        - containerPort: 8000
        livenessProbe:
          httpGet:
            path: /
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: seflscanfun-service
spec:
  selector:
    app: seflscanfun
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer
```

### Cloud Run (Google Cloud)
```bash
gcloud run deploy seflscanfun \
  --image ghcr.io/commjoen/seflscanfun:latest \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8000 \
  --memory 512Mi \
  --cpu 1
```

## Security

- Container draait als non-root user (`app`)
- Minimale base image (Python slim)
- Security scanning met Trivy in CI/CD
- Geen secrets of gevoelige data
- Read-only root filesystem mogelijk

## Monitoring

### Health Checks
```bash
# HTTP health check
curl -f http://localhost:8000/ || exit 1

# Python health check
python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8000')"
```

### Metrics
De applicatie biedt geen specifieke metrics endpoint. Gebruik container-level monitoring.

## Troubleshooting

### Container start niet
```bash
# Check logs
docker logs <container-id>

# Debug interactief
docker run -it --entrypoint /bin/bash ghcr.io/commjoen/seflscanfun:latest
```

### Poort niet beschikbaar
```bash
# Check welke poorten in gebruik zijn
netstat -tlnp | grep 8000

# Gebruik andere poort
docker run -p 8001:8000 ghcr.io/commjoen/seflscanfun:latest
```

### Prestatie issues
- Gebruik meerdere replicas achter load balancer
- Monitor resource usage met `docker stats`
- Overweeg CDN voor static assets

## Development

### Multi-stage builds
Het Dockerfile gebruikt een geoptimaliseerde single-stage build voor snelheid en veiligheid.

### Lokale development
```bash
# Live reload tijdens development
docker run -v $(pwd):/app -p 8000:8000 ghcr.io/commjoen/seflscanfun:latest
```

### Testing
```bash
# Run tests in container
docker run --rm ghcr.io/commjoen/seflscanfun:latest npm test
```

## CI/CD Integration

Docker images worden automatisch gebouwd en gepubliceerd naar GitHub Container Registry (GHCR) via GitHub Actions:

- **Pull Requests**: `pr-<number>` tag voor testing
- **Main branch**: `latest` en `main` tags
- **Releases**: Semantic version tags (v1.2.3)

Alle images worden gescand op security vulnerabilities voordat ze gepubliceerd worden.