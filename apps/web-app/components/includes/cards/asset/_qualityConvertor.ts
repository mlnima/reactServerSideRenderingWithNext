const _qualityConvertor = ( quality :string)=>{
  return   quality === '2160p' ? '4K' :
        quality === '1440p' ? '2K' :
            quality === '1080p' ? 'HD' :
                quality === '720p' ? 'HD' :
                    quality === '480p' ? 'SD' :
                        quality === '360p' ? 'SD' :
                            quality === '240p' ? 'SD' :
                                quality
}

export default _qualityConvertor;