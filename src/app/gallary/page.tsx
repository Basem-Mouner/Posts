
import Image from 'next/image';
import imgtest from '../../assets/grocery-banner.png';

export default function Gallary() {
    

    return (
      <>
        <h3>Gallary</h3>
            <Image src={imgtest} alt='' />
      </>
    );
}


      