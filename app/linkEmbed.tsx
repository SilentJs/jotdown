'use client'
import { useRef, useState } from 'react';
import './global.css'
import DriveIcon from './images/drive.svg'
import DropboxIcon from './images/dropbox.svg'
import MegaIcon from './images/mega.svg'
import UnknownIcon from './images/unkownFile.svg'
import DriveIconD from './images/driveD.svg'
import DropboxIconD from './images/dropboxD.svg'
import MegaIconD from './images/megaD.svg'
import Image from 'next/image'

export default function LinkEmbed({ link, onComponentRemove,offset,unMountAllowed,darkMode }) {
  const [shouldUnmount, setShouldUnmount] = useState(false);
  if(!unMountAllowed) unMountAllowed='true'
  if(!darkMode) darkMode='true'
  let icon, name;
  if (link?.includes('drive.google.com')) {
    icon = darkMode==='true' ? DriveIconD : DriveIcon;
    name = 'Drive';
  } else if (link?.includes('dropbox')) {
    icon = darkMode==='true' ? DropboxIconD : DropboxIcon;
    name = 'Dropbox';
  } else if (link?.includes('mega')) {
    icon = darkMode==='true' ? MegaIconD : MegaIcon;
    name = 'Mega';
  } else {
    icon = UnknownIcon;
    name = 'Unknown';
  }

  const handleUnmount = () => {
    onComponentRemove(link);
    setShouldUnmount(true);
  };

  if (shouldUnmount) {
    return null;
  }

  return (
    <div className='fileEmbedContainer' style={{top:offset}}>
      <Image className='fileEmbed' src={icon} alt='embedIcon' style={{filter:`invert(${darkMode==='true' ? 1 : 0})`}} />
      <div className='fileEmbedInfo'>{name} File Link</div>
      <div className='fileEmbedLink'>
        <a target="_blank" rel="noopener noreferrer" href={link}>{link}</a>
      </div>
      {unMountAllowed==='true' ? <div className='fileEmbedRemove' onClick={handleUnmount}>Click to remove</div> : <div className='fileEmbedRemove'></div>  }
    </div>
  );
}

  