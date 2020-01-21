# Autoservicio NodeJs - OpenUI5 (plus Docker)

Aplicación desarrollada sobre el entorno servidor NodeJS y framework OpenUI5 como interfaz de usuario, teniendo la capacidad de ser copmilado en un contenedor Docker (configuración Dockerfile).

## Performance

Para mejorar el rendimiento y carga de las fuentes en el cliente, se realizó la operación minified con todos los archivos correspondientes en la ruta src/static/App gracias a la configuración de ```grunt```, generando una carpeta **dist** en el directorio raiz. Posteriormente, se debe realizar una copia del archivo Component-preload.js que está dentro de la carpeta **dist** y pegarlo en el directorio src/static/App para corresponde a las fuentes minificadas, quedando al lado del archivo Component.js.

Nota: Es necesario considerar que el directorio raiz debe estar como nombre de **bessoec** según configuración del archivo Gruntfile.js

## Configuración

Para la configuración y migración a instancias TEST y Productivo con SuccessFactors, se debe tener en consideración:

* Ruta (endpoint) "redirect" de la instancia de Succesfactors -> conseguido desde el archivo metadata IDP de successfactors ()
* Configuración OAuth2 de SuccessFactors

## Instalación con Docker

### Configuración Instancia

La idea es que a nivel de docker / contenedor levantar diferentes instancias del servicio en base a la parametrización por variable de entorno y consumiendo una sola imagen docker.

Los parámetros (requeridos) son:

* **DOMAIN**: Host / Dominio de salida
* **PORT**: Puerto de acceso
* **SFSF_DC**: Data Center de SFSF
* **COMPANY_ID**: Id de la Compañia SFSF
* **GW_USER**: Usuario de Gateway
* **GW_PASSWORD**: Password Gateway
* **GW_URL**: URL Servicio OData
* **JWT_SECRET**: String / Key de encriptación y desencriptación de JSON Web Token

```
docker run -e "DOMAIN=http://localhost:4002/" -e "PORT=4002" -e "SFSF_DC=hcm19preview" -e "COMPANY_ID=comercialkT1" -e "API_KEY=M2ZlNjE2ZTEyYzA5ZDJmODJlYjZjMzQzMGUyMQ" -e "PRIVATE_KEY=MIIEpAIBAAKCAQEAxUsqFOlADe+mcpKzE0oh0jRi0bgpyhoFfv3BzISpF+wiS2fZ36eBq1pGhuV6cwvkysFaucOm9FnDZxo3rQEdd7jDSOFp/pwRe/ldyNfgRd6LOHiYlNikMYWULBFtW9ZtVgSF3J3QWD21b45cat0w9Vdh8G7Bjc1+9oGjZyyiTykPkOKtaCOykuB0iepKRLqenkToMJhdhTf3O00njmdZvpR2KP/EsxTDVJs52Ot+JItw/NYM+dtjjOpFEVr7vTpLE2I1VxTCcSmyBop1m0Gy09SxjlDUPx4hkEZPtXC6MU6RNnVuPkIiSKlhLGKc3zH5LNuL259AB6i94toQ0B4LPQIDAQABAoIBAQCThbyVnkOTKBshmKfmSIw5jYpGnppA0GxDpKMAtkFp7dtG3wR+w9Wltv79ZyHEXKRbJ3EbbjysgWIm+eefqTHLj5AWMtb61uAL/04tG55LIDihpSsSQVuk2+kLeox3G0LuCru9VxOup5W/MIfSMEqnaQuGqIp56aqB0DXKtAk5fn4NQ1UozJR6zDp/SEQS7ezy4AZERA1nU8cADqz22aX6rxlnIDVh2krYdwtK+66+cSwrlWavNGAEShwguorVFptvv4277drLKnNSIBvxfgMt5HFX5Oye0LjwxsW2ct8OhjmF3vJIkD3geAD1fbXtDqdV0hMZfDcaGtuNLrXaGiVRAoGBAOpoqyTfOrUBVAayCR4KQnpPSEUNdJJPuHld4Q7l23clSZblQPT2IY9JEYCcDPSXFB7JcS7ZahVcR7v4MjpPbDa7W6lOtk/+zNe+pMa9ud1sDEwCx0bvpL78Dc7/9bevYHNHPN8vvEwJH2vgAhbpaC384pykkAwxqKcYhPtm/6JPAoGBANd3Uqo4CFQFBH3/ptAZ3FcKW8WdVDj68MdrrNk1mndmN2V4OnOzQX93VPY5LQ5xEYruHV6oCxXEQX28ndxIVJtXnOigbuDQvpz9N4s1Piu6c0pLam9OBnpUh8qCEpqwCp6CM+Xszc/O9gFZAV1i0mah1Cb39M609ACZLCx/KhKzAoGAaczMUlwfF0t+LXd1/gULdEEMkX49OzyYOs9QoXTF1cUSrfTTmLzu8Mk+CRpmDo+SGUM6vraK1xFLn1+q6/6lDR8LhCNuzjRnKIl3vewsU/BMrJIkd7P6W+lQIjoNIdcaZW2l3+afyoHjmMEGsGixCPC3J5RvH9HaGXFLtF0MzKkCgYBOKxvyZSGgWbGnhHggR0GI0lk4+Dr18RQpRQcQRkIjzxGJ3nRWRVIdzE0mhtexxZN3s6s0DAL5gpm/5A3hPNx0/vQN8SZIqXJ9wd/EwSws8ReifHnAp63x83jQHyBgvj0cBGCPqbmBCrR1CLVWC+QJF+y/tnU6CKv9C5TbD8dTwQKBgQDhDuVaPb5I/voRlik/Z6GxGegZeSgLxl0QNivgaGOvLEKzu6fK0Qzpnga2nFoyqbxeKVdMLv+OWWxYWpKDth9Wybpmsu/sVft1PWtDmmLuuaNxKocm/CO9H38Gm9Nhig4TqL+c7y7ey6zounwNoFEuZMXmMZ3SftKuNLWdSOu3CA==" -e "GW_USER=acastro" -e  "GW_PASSWORD=Phr2018#" -e "GW_URL=http://fioriqas.kaufmann.cl:8000/sap/opu/odata/sap/ZHR_BOLETA_PAGO_PDF_SRV_01/" -e "JWT_SECRET=l1jy6boC0EXIDMZr_L5LsZx1IpfdTyZcYpbxcDLUR1Q" -d -p 4002:4002 --name autoservicio_qas_001 jpbarahona/qas_autoservicio_kaufmann_vm
```

## Pasos deploy

Después de realizar cualquier tipo de cambio en el código de la aplicación, hay que ejecutar los siguientes pasas (la mayoría en consola) para visualizar los cambios, ya sea para modo desarrollo o para test o productivo:

1. Ejecutar grunt
2. Copiar raiz > dist > Component-preload.js y pegar en raiz > src > static > App (manual)
3. Git add 
4. Git commit
5. Git push
6. Generar Imagen Docker
```
Docker build -t jpbarahona/qas_autoservicio_kaufmann_vm .
```
7. Subir imagen a la Nube de Docker Hub
```
Docker push jpbarahona/qas_autoservicio_kaufmann_vm
```
