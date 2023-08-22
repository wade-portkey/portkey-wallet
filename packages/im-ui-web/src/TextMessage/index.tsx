import React, { useEffect, useMemo, useState } from 'react';
import { Popover } from 'antd';
import { useCopyToClipboard } from 'react-use';
import ParsedText from '../components/ParsedText';
import './index.less';

import clsx from 'clsx';
import { ITextMessageProps } from '../type';
import { formatTime } from '../utils';
import PopoverMenuList from '../PopoverMenuList';
import CustomSvg from '../components/CustomSvg';

const TextMessage: React.FC<ITextMessageProps> = props => {
  const showDate = useMemo(() => (props.dateString ? props.dateString : formatTime(props.date as any)), []);
  const [, setCopied] = useCopyToClipboard();
  const [popVisible, setPopVisible] = useState(false);
  const hidePop = () => {
    setPopVisible(false);
  };

  const popoverList = [
    {
      key: 'copy',
      leftIcon: <CustomSvg type="Copy" />,
      children: 'Copy',
      onClick: () => {
        setCopied(props.text);
      },
    },
    {
      key: 'delete',
      leftIcon: <CustomSvg type="Delete" />,
      children: 'Delelte',
      onClick: () => props?.onDelete?.(`${props.id}`),
    },
  ];
  useEffect(() => {
    document.addEventListener('click', hidePop);
    return () => document.removeEventListener('click', hidePop);
  }, []);
  return (
    <div className={clsx(['portkey-message-text', 'flex', props.position])}>
      <Popover
        open={popVisible}
        overlayClassName={clsx(['message-item-popover', props.position])}
        placement={props.position === 'left' ? 'right' : 'left'}
        trigger="contextMenu"
        onOpenChange={visible => setPopVisible(visible)}
        showArrow={false}
        content={<PopoverMenuList data={popoverList} />}>
        <div className={clsx(['text-body', 'flex', props.position])}>
          <div className="text-text">
            {props.subType === 'non-text' ? (
              <span className="non-text">[Not supported message]</span>
            ) : (
              <ParsedText
                parse={[
                  {
                    type: 'url',
                    className: 'text-link',
                    onClick: url => {
                      const openWinder = window.open(url, '_blank');
                      if (openWinder) {
                        openWinder.opener = null;
                      }
                    },
                  },
                ]}>
                {props.text}
              </ParsedText>
            )}
            <span className="text-date-hidden">{showDate}</span>
          </div>
          <div className="text-date">{showDate}</div>
        </div>
      </Popover>
    </div>
  );
};

export default TextMessage;
