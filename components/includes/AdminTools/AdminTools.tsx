import {FC, useState} from 'react';
import Link from "next/link";
import styled from "styled-components";
import Draggable from 'react-draggable';
import {useRouter} from "next/router";
import {fetchClearCaches} from "@store_toolkit/adminReducers/adminPanelGlobalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

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
                    <SvgRenderer svgUrl={'/public/asset/images/icons/gears-solid.svg'}
                                 size={25}
                                 customClassName={'admin-tools-item-logo'}
                                 color={'var(--primary-button-link-text-color, #000)'}/>
                </button>

                {open &&
                //@ts-ignore

                <>
                    <Link href={'/admin'} locale={false}>
                        <a className='admin-tools-item' target={'_blank'}>
                            <SvgRenderer svgUrl={'/public/asset/images/icons/user-shield-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>


                        </a>
                    </Link>
                    <Link href={'/admin/design/widgets'} locale={false}>
                        <a className='admin-tools-item' target={'_blank'}>
                            <SvgRenderer svgUrl={'/public/asset/images/icons/pen-to-square-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>

                        </a>
                    </Link>
                    <Link href={'/admin/settings/general'} locale={false}>
                        <a className='admin-tools-item' target={'_blank'}>
                            <SvgRenderer svgUrl={'/public/asset/images/icons/gear-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>
                        </a>
                    </Link>
                    <Link href={'/admin/assets?assetsType=posts'} locale={false}>
                        <a className='admin-tools-item' target={'_blank'}>
                            <SvgRenderer svgUrl={'/public/asset/images/icons/envelope-solid.svg'}
                                         size={25}
                                         customClassName={'admin-tools-item-logo'}
                                         color={'var(--primary-button-link-text-color, #000)'}/>
                        </a>
                    </Link>
                    <button className='admin-tools-item'
                            onClick={() => dispatch(fetchClearCaches({router}))}
                            onTouchStartCapture={() => dispatch(fetchClearCaches({router}))}>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/eraser-solid.svg'}
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
