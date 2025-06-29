import React from "react";
import { useNavigate } from "react-router-dom";
import "./Quotation.css";

const Quotation = () => {
    const navigate = useNavigate();

    const cards = [
        { title: "Consumer Accounts", path: "/quotations/consumer-accounts" },
        { title: "Prices", path: "/quotations/prices" },
        { title: "Discounts", path: "/quotations/discounts" },
        { title: "Validity Period", path: "/quotations/validity-period" },
        { title: "Status", path: "/quotations/status" },
    ];

    return (
        <div className="quotation-page">
            <div className="quotation-header">
                <button className="quotation-tab">Quotation</button>
                {/* <div className="quotation-search-wrapper">
                    <input
                        type="text"
                        placeholder="*Search Product..."
                        className="quotation-search"
                    />
                    <span className="quotation-search-icon">🔍</span>
                </div> */}
            </div>

            <div className="quotation-cards">
                {cards.map((card, index) => (
                    <div className="quotation-card" key={index}>
                        <h3>{card.title}</h3>
                        <button
                            className="view-btn"
                            onClick={() => navigate(card.path)}
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quotation;
