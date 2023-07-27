import {FC} from "react";
import Link from "next/link";
import {MenuItem} from "typescript-types";
import useAppTranslator from "@components/common/hooks/useAppTranslator";

interface MenuWidgetItemPropTypes {
    menuItem: MenuItem,
    setOpen: any,
}

const MenuWidgetItem: FC<MenuWidgetItemPropTypes> = ({menuItem, setOpen}) => {

    const translatedWord = useAppTranslator({ word: menuItem.name });

    return (
        <div className={'menu-item'}>
            <Link href={menuItem.target}
                  className={'menu-item-link'}
                  target={menuItem.target.includes('http') ? '_blank' : '_self'}
                  title={translatedWord}
                  onClick={() => setOpen(false)}>
                  {translatedWord}
            </Link>
        </div>
    )
};

export default MenuWidgetItem;
