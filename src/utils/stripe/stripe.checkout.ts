import stripe from "../../config/stripe.config";

const createStripeCheckoutSession = async (priceId: string) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    return session;
};

export default createStripeCheckoutSession;