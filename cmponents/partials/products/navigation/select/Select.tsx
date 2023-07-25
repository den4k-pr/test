"use client"

import { useAppDispatch } from '@/redux/hooks';
import { setSelectedValue } from '@/redux/state/togleSelect';
import React, { useState } from 'react';

const CustomSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionsVisible, setOptionsVisible] = useState<boolean>(false);

  const handleOptionClick = (optionValue: string): void => {
    setSelectedOption(optionValue);
    setOptionsVisible(false);
  };

  const dispatch = useAppDispatch();

  const handleButtonClick = (value: string) => {
    dispatch(setSelectedValue(value));
  };

  return (
    <div className="select">
      <div
        className="selected-option"
        onClick={() => setOptionsVisible(!isOptionsVisible)}
      >
        {selectedOption ? selectedOption : 'Виберіть по ціні'}
      </div>
      {isOptionsVisible && (
        <div className="options">
          <div
            className="option"
            onClick={() => (handleOptionClick('По зростаню цін'), handleButtonClick('up'))}
          >
            По зростаню цін
          </div>
          <div
            className="option"
            onClick={() => (handleOptionClick('По спаданю цін'), handleButtonClick('down'))}
          >
            По спаданю цін
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
