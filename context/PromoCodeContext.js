import React, { useState, createContext } from 'react';
export const PromoCodeContext = createContext();
export const PromoCodeProvider = props => {

    const [promoCode, setPromoCode] = useState('');
    const [promoCodeMessage, setPromoCodeMessage] = useState('');
    const [promoCodeStatus, setPromocodeStatus] = useState('');

    return (
        <>
            <PromoCodeContext.Provider
                value={{
                    promoCodeDetails: [promoCode, setPromoCode, promoCodeMessage, setPromoCodeMessage, promoCodeStatus, setPromocodeStatus],
                }}
            >
                {props.children}
            </PromoCodeContext.Provider>
        </>
    );
};
