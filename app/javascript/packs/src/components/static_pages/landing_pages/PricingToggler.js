import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  readableDecimal,
  readablePercent,
} from '../../../../utilities/formatting';

const monthly_price = 2.99;
const yearly_from_monthly_calculated = monthly_price * 12;

const yearly_savings_percentage = 0.35;
const yearly_price =
  yearly_from_monthly_calculated -
  yearly_from_monthly_calculated * yearly_savings_percentage;

const yearly_savings =
  yearly_from_monthly_calculated * yearly_savings_percentage;

const PricingToggler = () => {
  const [enabled, setEnabled] = useState(true);

  const toggleEnabled = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="w-full px-2 mx-auto flex flex-col justify-center items-center mb-4">
      <div className="w-full px-4 py-8 rounded-lg bg-gray-200">
        <h3 className="text-center text-xl text-gray-500 font-semibold mb-6">
          Billed {enabled ? 'yearly' : 'monthly'}
        </h3>
        {/* toggler start */}
        <div className={'w-full flex justify-center items-center mb-4'}>
          <div
            onClick={toggleEnabled}
            style={{
              touchAction: 'pan-x',
              display: 'inline-block',
              position: 'relative',
              marginLeft: 'auto',
              marginRight: 'auto',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 0,
              padding: 0,
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div
              style={
                enabled
                  ? {
                      width: 50,
                      height: 30,
                      padding: 0,
                      borderRadius: 30,
                      backgroundColor: '#AC5EDC',
                      transition: 'all .2s ease',
                    }
                  : {
                      width: 50,
                      height: 30,
                      padding: 0,
                      borderRadius: 30,
                      backgroundColor: '#949494',
                      transition: 'all .2s ease',
                    }
              }
            ></div>
            <div
              style={
                enabled
                  ? {
                      transition: 'all .2s cubic-bezier(.23,1,.32,1) 0ms',
                      position: 'absolute',
                      top: 1,
                      right: 1,
                      width: 28,
                      height: 28,
                      border: '1px solid #AC5EDC',
                      borderRadius: '50%',
                      backgroundColor: '#fafafa',
                      boxSizing: 'border-box',
                      transition: 'all .25s ease',
                    }
                  : {
                      transition: 'all .2s cubic-bezier(.23,1,.32,1) 0ms',
                      position: 'absolute',
                      top: 1,
                      left: 1,
                      width: 28,
                      height: 28,
                      border: '1px solid #949494',
                      borderRadius: '50%',
                      backgroundColor: '#fafafa',
                      boxSizing: 'border-box',
                      transition: 'all .25s ease',
                    }
              }
            ></div>
            <input
              style={{
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                width: 1,
              }}
              type="checkbox"
              aria-label="Toggle Button"
            />
          </div>
        </div>
        {/* toggler end */}

        {/* price start */}
        <div className={'w-full flex justify-center items-center mb-2'}>
          <h3 className="text-3xl font-semibold text-gray-900 pt-3">$</h3>
          <h1 className={'text-5xl font-semibold text-gray-900'}>
            {enabled
              ? readableDecimal(yearly_price)
              : readableDecimal(monthly_price)}{' '}
          </h1>
          <h3 className="text-3xl font-semibold text-gray-900 pl-1 pt-2">
            /{enabled ? 'year' : 'month'}
          </h3>
        </div>
        {/* price end */}

        {/* breakdown start */}
        <div className={'w-full flex justify-center items-center'}>
          <h3 className={'font-semibold text-xl text-gray-500 text-center'}>
            {enabled
              ? ` Save $${readableDecimal(yearly_savings)} or ${readablePercent(
                  yearly_savings_percentage
                )}%!`
              : `($${readableDecimal(yearly_from_monthly_calculated)} /year)`}
          </h3>
        </div>
        {/* breakdown end */}
      </div>
    </div>
  );
};

const App = document.createElement('div');

App.setAttribute('id', 'App');

const pricingTogglerContainer = document.querySelector(
  '#pricing_toggler_container'
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PricingToggler />, pricingTogglerContainer.appendChild(App));
});
