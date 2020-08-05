const stripe = require("stripe")("sk_test_51HCbk0GbfOcJRAjdbdEVO1IPeR5NDoWqAKlHWAXii8JIL2iCsA5ARL7TcuQUWAprKS2T1JrGslS5Q2O5Uzfayuta00Q5oZEAsV")

module.exports = {
    getMoney: async (req, res) => {
        // console.log("Request:", req.body)

        let error;
        let status;
        let customer;
        let charge;

        const { token, totalAmount } = req.body;
        try {

            customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            });

            charge = await stripe.charges.create(
                {
                    amount: totalAmount*100,
                    currency: "usd",
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `Purchased the amount of ${totalAmount} from Gabina's Cuisine.`,
                    shipping: {
                        name: token.card.name,
                        address: {
                            line1: token.card.address_line1,
                            line2: token.card.address_line2,
                            city: token.card.address_city,
                            country: token.card.address_country,
                            postal_code: token.card.address_zip
                        }
                    }
                },
            );
            console.log("Charge:", { charge });
            status = "success";
        } catch (error) {
            console.error("Error:", error);
            status = "failure";
        }
        res.json({ error, status });
    }
}