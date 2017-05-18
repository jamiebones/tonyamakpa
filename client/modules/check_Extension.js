

let _checkExtension = (filename) => {
    if (filename){
      let extensionArray = filename.split(".");
      let extension = extensionArray[extensionArray.length - 1];
      return extension.toLowerCase();
    }
}

let _validateExtension = (filename) => {
    let extension = _checkExtension(filename);
    switch (extension) {
      case "pdf":
       return "document";
       break;
      case "doc" :
       return "document";
       break;
      case "mp3" :
      return "audio";
       break;
      case "docx" :
       return "document";
       break;
      case "avi" :
       return "video";
       break;
      case "mpeg" :
       return "audio";
       break;
      default:
        return extension + " type not allowed please change the file type";
    }
}


export default function(filename){
   return _validateExtension(filename);
}
