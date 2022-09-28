import React from "react";
import { useState, useEffect, useContext } from 'react';
import InputField from '@/components/UiFields/InputField/InputField';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import axios from '@/utils/request';
import { PromoCodeContext } from '@/context/PromoCodeContext';

const PromoCode = ({ note, imgSrc, bg }) => {
    const promoCodeApi = '/promo-code';
    const { promoCodeDetails } = useContext(PromoCodeContext);
    const [promoCode, setPromoCode, promoCodeMessage, setPromoCodeMessage, promoCodeStatus, setPromocodeStatus] = promoCodeDetails;

    const handleLeadsInfo = (e) => {
        const { name, value } = e.target;
        setPromoCode(value);
        setPromoCodeMessage('');
    };

    const checkPromocodeValidation = () => {

    }
    const checkPromocodeStatus = () => {
        axios(promoCodeApi, {
            method: 'GET',
            params: {
                code: promoCode,
            },
        })
            .then(response => {
                if (response.status === 200) {
                    const codeMessage = response.data.message;
                    const codeStatus = response.data.status;
                    setPromoCodeMessage(codeMessage);
                    setPromocodeStatus(codeStatus);
                    setPromoCode(promoCode);
                }
            })
            .catch(error => {
                setPromoCodeMessage(error.response.data.message);
                setPromocodeStatus(error.response.data.status);
                setPromoCode('')
            });
    }

    return (
        <div className="Promo-Code">
            <div className="row">
                <div className="col-12">
                    <FormTitle title="Promo code"></FormTitle>
                </div>
                <div className="col-8 col-md-6">
                    <InputField
                        value={promoCode}
                        //label="Name"
                        name="promoCode"
                        placeholder="Enter Promo Code"
                        type="text"
                        onChange={e => handleLeadsInfo(e)}
                        onBlur={checkPromocodeValidation}
                        maxLength="15"
                    />
                </div>
                <div className="col-4 col-md-6">
                    <button
                        type="button"
                        className="promo-Apply"
                        onClick={() => {
                            checkPromocodeStatus()
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>

            {promoCodeMessage && <p className={`${promoCodeStatus === "Success" ? "successMessage" : "errorMessage"}`}>{promoCodeMessage}</p>}
        </div>
    );
};

export default PromoCode;
