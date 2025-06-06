import { useEffect, FC } from 'react';

interface KeyboardShortcut {
  keys: string[];
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  callback: () => void;
}

interface KeyboardHandlerProps {
  shortcuts: KeyboardShortcut[];
}

const KeyboardHandler: FC<KeyboardHandlerProps> = ({ shortcuts }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const {
          keys,
          ctrlKey = false,
          altKey = false,
          shiftKey = false,
          metaKey = false,
          preventDefault = true,
          callback,
        } = shortcut;

        // Check if the current key matches any of the specified keys
        const keyMatch = keys.some(key =>
          key.toLowerCase() === event.key.toLowerCase() ||
          key.toLowerCase() === event.code.toLowerCase(),
        );

        // Check if modifier keys match
        const modifiersMatch =
          event.ctrlKey === ctrlKey &&
          event.altKey === altKey &&
          event.shiftKey === shiftKey &&
          event.metaKey === metaKey;

        // If both key and modifiers match, execute the callback
        if (keyMatch && modifiersMatch) {
          if (preventDefault) {
            event.preventDefault();
            event.stopPropagation();
          }
          callback();
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return null;
};

export default KeyboardHandler;

//Example:
// import KeyboardHandler from './KeyboardHandler';
//
// const AdminPanel = () => {
//   const myCustomFunction = () => {
//     console.log('My custom function executed!');
//     // Whatever you want to do
//   };
//
//   const anotherFunction = () => {
//     alert('Another function!');
//   };
//
//   const shortcuts = [
//     {
//       keys: ['s'],
//       ctrlKey: true,
//       callback: myCustomFunction
//     },
//     {
//       keys: ['d'],
//       altKey: true,
//       shiftKey: true,
//       callback: anotherFunction
//     }
//   ];
//
//   return (
//     <div>
//       <KeyboardHandler shortcuts={shortcuts} />
//   <h1>Admin Panel</h1>
//   </div>
// );
// };