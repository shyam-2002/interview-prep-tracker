  
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,

  )
  console.log("came here");
  // FilePond.setOptions({
  //   stylePanelAspectRatio: 150 / 100,
  //   imageResizeTargetWidth: 100,
  //   imageResizeTargetHeight: 150
  // })
  
  FilePond.parse(document.body);
  
  