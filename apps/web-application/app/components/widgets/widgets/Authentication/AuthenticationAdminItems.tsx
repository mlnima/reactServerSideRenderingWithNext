import Link from 'next/link';
import { useAppDispatch } from '@store/hooks';
import { setAdminMode, setAlert } from '@store/reducers/globalStateReducer';
import { useSelector } from 'react-redux';
import { IClearCache, Store } from '@repo/typescript-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons/faUserShield';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
import { faShield } from '@fortawesome/free-solid-svg-icons/faShield';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { useParams, usePathname, useSearchParams, useSelectedLayoutSegment } from 'next/navigation';

import socket from '@lib/web-socket-client';
import { faBolt, faChevronDown, faChevronUp, faWrench } from '@fortawesome/free-solid-svg-icons';
import { clearACacheByTag, clearCachesByServerAction } from '@lib/serverActions';
import { fixUserDocuments } from '@lib/actions/database/fix';
import { cookieChecker, deleteCookie, cookieSetter } from '@lib/actions/cookieTools';
import { useState } from 'react';

const AuthenticationAdminItems = () => {

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const segment = useSelectedLayoutSegment();
  const adminMode = useSelector(({ globalState }: Store) => globalState.adminMode);
  const [cacheManagerItems,setCacheManagerItems] = useState<boolean>(false)

  const onClearCacheHandler = async ({ mode }: IClearCache): Promise<void> => {
    try {
      await clearCachesByServerAction({
        path: pathname,
        segment,
        mode,
        searchParams,
        params,
      });

      dispatch(setAlert({
        message: 'Cache cleared',
        type: 'info',
      }));
    } catch (error) {
      console.log(`onClearCacheHandler=> `, error);
      dispatch(setAlert({
        message: 'Error While Clearing Cache',
        type: 'error',
      }));
    }
  };
  //
  const onSetAdminModeHandler = async () => {
    const adminModeCookie = await cookieChecker('adminMode')

    if (!adminModeCookie){
      dispatch(setAdminMode(true));
      await cookieSetter({
        name: 'adminMode',
        value: 'true',
      })
      dispatch(setAdminMode(true));

    }else {
      dispatch(setAdminMode(false));
      await deleteCookie('adminMode');

    }
  };


  const applyFixes = async () => {
    await fixUserDocuments();
  };





  return (
    <>
      <div className={'menuItem'}>
        {/*<Link href={'/dashboard'} target={'_blank'} className={'menuItemContent'}>*/}
        {/*  <div className={'icon-wrapper'}>*/}
        {/*    <FontAwesomeIcon icon={faUserShield} style={{ width: 25, height: 25 }} />*/}
        {/*  </div>*/}
        {/*  Dashboard*/}
        {/*</Link>*/}
        <Link href={'/admin'} className={'menuItemContent'}>
          <div className={'icon-wrapper'}>
            <FontAwesomeIcon icon={faUserShield} style={{ width: 25, height: 25 }} />
          </div>
          Dashboard
        </Link>
      </div>

      <div className="menuItem">
                            <span className={'menuItemContent'} onClick={onSetAdminModeHandler}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={adminMode ? faCheck : faShield} style={{ width: 25, height: 25 }} />
                  </div>
                Admin Mode
            </span>
      </div>


      {adminMode &&
        <>
          <div className={'menuItem'}>
            <span className={'menuItemContent'} onClick={()=>setCacheManagerItems(!cacheManagerItems)}>
              <div className={'icon-wrapper'}>
                <FontAwesomeIcon icon={cacheManagerItems ? faChevronUp:faChevronDown} style={{ width: 25, height: 25 }} />
              </div>
              Cache Manager

            </span>
          </div>
          {cacheManagerItems && <>

            <div className={'menuItem'}>
                        <span className={'menuItemContent'}
                              onClick={() => onClearCacheHandler({ mode: 'only' })}>
                            <div className={'icon-wrapper'}>
                            <FontAwesomeIcon icon={faEraser} style={{ width: 25, height: 25 }} />
                            </div>
                            Clear Only This Page Caches
                        </span>
            </div>

            <div className="menuItem">
                        <span className={'menuItemContent'}
                              // onClick={() => onClearCacheHandler({ mode: 'widgets' })}>
                              onClick={async () => await clearACacheByTag('CWidgets')}>
                               <div className={'icon-wrapper'}>
                                   <FontAwesomeIcon icon={faEraser} style={{ width: 25, height: 25 }} />
                               </div>
                               Clear Widgets Caches
                       </span>
            </div>

            <div className="menuItem">
                   <span className={'menuItemContent'}
                         // onClick={() => onClearCacheHandler({ mode: 'settings' })}>
                          onClick={async () => await clearACacheByTag(`CSettings`)}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{ width: 25, height: 25 }} />
                  </div>
                Clear Settings Caches
            </span>
            </div>

            <div className="menuItem">
                                            <span className={'menuItemContent'}
                                                 // onClick={() => onClearCacheHandler({ mode: 'all' })}>
                                                  onClick={async () => await clearACacheByTag(`cacheItem`)}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{ width: 25, height: 25 }} />
                  </div>
                Clear Entire Website Caches
            </span>
            </div>



          </>}

          <div className="menuItem">
                                            <span className={'menuItemContent'}
                                                  onClick={() => applyFixes()}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faWrench} style={{ width: 25, height: 25 }} />
                  </div>
               Apply Fixes
            </span>
          </div>


        </>
      }


      {pathname.includes('/chatroom/') &&
        <div className="menuItem">
          <button className={'menuItemContent'} onClick={() => socket.emit('correctChatroomsMessages')}>
            <div className={'icon-wrapper'}>
              <FontAwesomeIcon icon={faBolt} style={{ width: 25, height: 25 }} />
            </div>
            Correct Chatroom's Messages
          </button>
        </div>
      }
    </>
  );
};
export default AuthenticationAdminItems;