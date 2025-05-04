import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tooltip } from '@heroui/react';

interface ShortcutProps {
  keys: string[];
  description: string;
}

const Shortcut: React.FC<ShortcutProps> = ({ keys, description }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-default-600">{description}</span>
      <div className="flex gap-1">
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            <kbd className="px-2 py-1 text-xs font-semibold text-default-600 bg-default-100 border border-default-200 rounded">
              {key}
            </kbd>
            {index < keys.length - 1 && <span className="text-default-400 mx-1">+</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const KeyboardShortcutsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  return (
    <>
      <Tooltip content="Keyboard shortcuts (press ? to open)">
        <Button 
          isIconOnly 
          variant="flat" 
          color="default" 
          radius="full"
          className="bg-content1 border border-default-200"
          onPress={() => setIsOpen(true)}
        >
          <Icon icon="lucide:keyboard" className="w-5 h-5 text-default-500" />
        </Button>
      </Tooltip>
      
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Keyboard Shortcuts
              </ModalHeader>
              <ModalBody>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-default-500 mb-2">Navigation</h4>
                  <Shortcut keys={["g", "h"]} description="Go to Home" />
                  <Shortcut keys={["g", "d"]} description="Go to Dashboard" />
                  <Shortcut keys={["g", "s"]} description="Go to Settings" />
                </div>
                
                <div className="space-y-1 mt-4">
                  <h4 className="text-sm font-medium text-default-500 mb-2">Actions</h4>
                  <Shortcut keys={["/"]} description="Focus search" />
                  <Shortcut keys={["Ctrl", "/"]} description="Toggle theme" />
                  <Shortcut keys={["n"]} description="Create new item" />
                  <Shortcut keys={["?"]} description="Show this help dialog" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};