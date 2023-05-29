# Gato

## How to install

### Clone the repository.
```bash
git clone https://github.com/Kruceo/Gato.git gato
```

### Install dependencies.
```bash
cd gato
```
```bash
npm i
```

## Run the application.
```bash
node index.mjs
```

## How to use.

### Image uploading.

Put your image files inside "public" folder.

<br/>

### Using search params.

Assuming that you uploaded a "image.png" file to public folder.

<br/>
Check "http://localhost:8080/image.png"

<br/>
You will receive the image like any other server.

<br/>
But you can use search params like:

* resize
* blur
* rotate
* tint


## Examples

* Tint - /image.png?tint=255,0,0
* Resize - /image.png?resize=200,1000
* Blur - /image.png?blur=10
* Rotate - /image.png?rotate=45

### You can do a mix:

* Resize + Blur - /image.png?resize=100,100&blur=10
* Rotate + Blur + Tint - /image.png?rotate=120&blur=10&tint=0,120,255

### ** If want a test: ** 
<a href="https://cdn.kruceo.com/image.png?blur=20">Blurred image</a>

## Info

All edited images will be hard cached.
The server will not re-edit an image with search params that were edited in the past.
