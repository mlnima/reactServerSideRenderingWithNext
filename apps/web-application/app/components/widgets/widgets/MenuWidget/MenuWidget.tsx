"use client"
import React, {FC, memo, useState} from "react";
import {MenuItem} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import MenuWidgetItem from "@components/widgets/widgets/MenuWidget/MenuWidgetItem";

interface MenuWidgetPropTypes {
    menuItems: MenuItem[],
}


const MenuWidget: FC<MenuWidgetPropTypes> = ({menuItems}) => {
    const [open, setOpen] = useState(false);

    const renderMenuItems = [
        ...menuItems?.filter((menuItem: MenuItem) => !menuItem.parent)
            ?.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1)]
        .map(menuItem => {
            return (
                <MenuWidgetItem menuItem={menuItem}
                                key={menuItem.itemIndex}
                                setOpen={setOpen}
                />
            )
        })

    return (
        <div className="relative z-10">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center m-0"
                aria-label="open navigation"
            >
                <FontAwesomeIcon
                    className="text-[var(--primary-text-color,#fff)]"
                    icon={faBars}
                    style={{width: 28, height: 28}}
                />
            </button>
            <div
                className={`fixed top-0 left-0 bottom-0 w-5/6 bg-[var(--secondary-background-color,#181818)] z-1000 flex flex-col p-0 pt-12 space-y-4 overflow-y-auto transform ${
                    open ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-500 ease-out`}
            >
                <button
                    onClick={() => setOpen(!open)}
                    className="absolute top-4 right-6 p-2 bg-transparent border-none text-[var(--primary-text-color,#fff)]"
                >
                    <FontAwesomeIcon
                        className="text-[var(--primary-text-color,#fff)]"
                        icon={faXmark}
                        style={{width: 25, height: 25}}
                    />
                </button>
                <ul>{renderMenuItems}</ul>
            </div>
        </div>
    );
};

export default memo(MenuWidget);
