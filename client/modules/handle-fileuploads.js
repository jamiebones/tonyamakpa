

let _collectfile = (event , template) =>{
    let file = event.target.files[0]
    return file
}

let _showProgressBar = (div) => {
  let _div = document.getElementById(div);
  _div.classList.remove("hide");
}

let _closeProgressBar = (div) => {
   let _div = document.getElementById(div);
   _div.classList.add("hide");
}

let _slingShotUploadConfigure = (event , template , folder ,div , metacontext) => {
     let _upload = new Slingshot.Upload(folder , metacontext);
     let _file = _collectfile(event , template);
     //_file.name = template.newFilename.get();
     _showProgressBar(div);
     _upload.send(_file , (error , downloadUrl) => {
         template.uploader.set();
         if (error){
            //throw new Meteor.Error('500' , error.reason);
            event.target.value = '';
            sAlert.error(error.reason , {effect: 'bouncyflip',
            position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: false, offset: '150px'});
            _closeProgressBar(div);
         }
         else{
           sAlert.success('File was uploaded successfully' , {effect: 'genie',
           position: 'bottom-right', timeout: 3000, onRouteClose: false, stack: false, offset: '150px'});
           event.target.value = '';
           template.downloadUrl.set(downloadUrl);
           _closeProgressBar(div);
           //return downloadUrl;

         }
     });
     template.uploader.set(_upload);
}

//let _setupReactiveVariables = ( template ) => {
//    template.uploader = new ReactiveVar();
//    template.downloadUrl = new ReactiveVar();
//};


export default function(event , template , folder ,div , metacontext){
   //_setupReactiveVariables(template)
   return _slingShotUploadConfigure(event , template , folder,div , metacontext)
}
