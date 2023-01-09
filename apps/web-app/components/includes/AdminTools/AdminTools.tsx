import {FC, useState} from 'react';
import Link from "next/link";
import styled from "styled-components";
import Draggable from 'react-draggable';
import {useRouter} from "next/router";
import {useAppDispatch} from "@store_toolkit/hooks";
import SvgRenderer from "../../global/commonComponents/SvgRenderer/SvgRenderer";
import clearCaches from "api-requests/src/dashboard/clearCaches";

let StyledDiv = styled.div`
  position: fixed;
  bottom: 20%;
  left: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1000;

  .admin-tools-item {

    background: var(--main-active-color, #0073aa);
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .5s;
    z-index: 2;
    text-decoration: none;
    margin: 10px;

    .admin-tools-item-logo {
      transition: .5s;
      color: black;
      width: 30px;
      height: 30px;

      &:hover {

        width: 40px;
        height: 40px;
      }
    }
  }
`

const AdminTools: FC = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [open, setOpen] = useState(false)


    return (
        //@ts-ignore
        <Draggable handle='.handle'>
            <StyledDiv className='admin-tools'>
                <button className='admin-tools-item open-button handle'
                        onDoubleClick={() => setOpen(!open)}
                        onTouchStartCapture={() => setOpen(!open)}>
                    <SvgRenderer svgUrl={'/asset/images/icons/gears-solid.svg'}
                                 size={25}
                                 customClassName={'admin-tools-item-logo'}
                                 color={'var(--primary-button-link-text-color, #000)'}/>
                </button>

                {open &&
                //@ts-ignore

                <>
                    <Link href={'/dashboard'} locale={false} className='admin-tools-item' target={'_blank'}>

                            <SvgRenderer svgUrl={'/asset/images/icons/user-shield-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>

                    </Link>
                    <Link href={'/dashboard/design/widgets'} locale={false} className='admin-tools-item' target={'_blank'}>

                            <SvgRenderer svgUrl={'/asset/images/icons/pen-to-square-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>

                    </Link>
                    <Link href={'/dashboard/settings/general'} locale={false} className='admin-tools-item' target={'_blank'}>
                            <SvgRenderer svgUrl={'/asset/images/icons/gear-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>
                    </Link>
                    <Link href={'/dashboard/assets?assetsType=posts'} locale={false} className='admin-tools-item' target={'_blank'}>
                            <SvgRenderer svgUrl={'/asset/images/icons/envelope-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>
                    </Link>
                    <button className='admin-tools-item'
                            onClick={() =>clearCaches().then(()=>router.reload())}
                            onTouchStartCapture={() => clearCaches().then(()=>router.reload())}>
                        <SvgRenderer svgUrl={'/asset/images/icons/eraser-solid.svg'}
                                     size={25}
                                     customClassName={'admin-tools-item-logo'}
                                     color={'var(--primary-button-link-text-color, #000)'}/>
                    </button>
                </>
                }

            </StyledDiv>
        </Draggable>

    );
};
export default AdminTools;
