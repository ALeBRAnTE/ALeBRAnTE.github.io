import http from 'http';
import formidable from'formidable';
import fs from 'fs';
import path from 'path';
const dirTexto = "./dTexto";
const dirImagens = "./dImagens";
const dirCodigos = "./dCodigos";
const dirSlides = "./dSlides";
const dirOutros = "./dOutros";

http.createServer(function (req, res){
    if(req.url == '/fileupload'){
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            var fileName  = files.filetoupload.originalFilename;
            var filePath = files.filetoupload.filepath;
            
            if (fileName.includes('txt') || fileName.includes('doc') || fileName.includes('docx') || fileName.includes('odt')) {
                if(!fs.existsSync(dirTexto)){
                    fs.mkdirSync(dirTexto);
                }
                var fileNewPath =  dirTexto + '/' + fileName;
            } else if (fileName.includes('jpg') || fileName.includes('jpeg') || fileName.includes('png') || fileName.includes('gif') || fileName.includes('bmp')) {
                if(!fs.existsSync(dirImagens)){
                    fs.mkdirSync(dirImagens);
                }
                var fileNewPath =  dirImagens + '/' + fileName;
            } else if (fileName.includes('html') || fileName.includes('css') || fileName.includes('js') || fileName.includes('java') || fileName.includes('python')) {
                if(!fs.existsSync(dirCodigos)){
                    fs.mkdirSync(dirCodigos);
                }
                var fileNewPath =  dirCodigos + '/' + fileName;
            } else if (fileName.includes('pdf') || fileName.includes('ppt') || fileName.includes('pptx') || fileName.includes('odp')) {
                if(!fs.existsSync(dirSlides)){
                    fs.mkdirSync(dirSlides);
                }
                var fileNewPath =  dirSlides + '/' + fileName;
            } else {
                if(!fs.existsSync(dirOutros)){
                    fs.mkdirSync(dirOutros);
                }
                var fileNewPath =  dirOutros + '/' + fileName;
            }
            

            fs.rename(filePath, fileNewPath, function (err) {
                if (err) throw err;
                fs.readFile('./index.html', (err, data) => {
                  if (err) throw err;
                  res.writeHead(200, {
                    'Content-Type': 'text/html'
                  });
                  res.write(data);
                  return res.end();
                });
        
              });
              console.log('Upload Realizado com Sucesso: ' + fileName);
              console.log(fileNewPath);

        });
    }else {
        if (req.url === '/')
          var name = "./index.html";
        else
          var name = '.' + req.url;
    
        fs.readFile(name, (err, data) => {
          if (err) {
            res.writeHead(404, {
              'Content-Type': 'text/html'
            });
            return res.end('404 recurso não encontrado');
          }
    
          if (name.includes('html')) {
            res.writeHead(200, {
              'Content-Type': 'text/html'
            });
            return res.end(data);
          }
          if (name.includes('css')) {
            res.writeHead(200, {
              'Content-Type': 'text/css'
            });
            return res.end(data);
          }
          if (name.includes('jpg')) {
            res.writeHead(200, {
              'Content-Type': 'image/jpg'
            });
            return res.end(data);
          }
          if (name.includes('jpeg')) {
            res.writeHead(200, {
              'Content-Type': 'image/jpeg'
            });
            return res.end(data);
          }
          if (name.includes('png')) {
            res.writeHead(200, {
              'Content-Type': 'image/png'
            });
            return res.end(data);
          }
          if (name.includes('gif')) {
            res.writeHead(200, {
              'Content-Type': 'image/gif'
            });
            return res.end(data);
          }
        })
      }
}).listen(8080);
