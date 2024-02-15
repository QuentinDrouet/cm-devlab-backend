```
docker pull postgres
docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d postgres
```

Ne pas oublier de créer la DB "holo" sur pg admin.