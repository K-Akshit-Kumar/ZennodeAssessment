import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const priceA = 20.0;
const priceB = 40.0;
const priceC = 50.0;

function calculateTotal(price, quantity, giftWrap) {
    let total = price * quantity;
    if (giftWrap) {
        total += quantity;
    }
    return total;
}

function calculateDiscount(quantityA, quantityB, quantityC, subtotal) {
    let discount = 0;
    if (subtotal > 200) {
        discount = 10;
    } else if (quantityA > 10 || quantityB > 10 || quantityC > 10) {
        discount = subtotal * 0.05;
    } else if (quantityA + quantityB + quantityC > 20) {
        discount = subtotal * 0.1;
    } else if (quantityA + quantityB + quantityC > 30 && quantityA > 15) {
        discount = subtotal * 0.5;
    }
    return discount;
}


function calculateShippingFee(totalQuantity) {
    return Math.ceil(totalQuantity / 10) * 5;
}

function calculateGiftWrapFee(quantity, giftWrap) {
    return giftWrap ? quantity : 0;
}
rl.question('Enter quantity for Product A: ', (quantityA) => {
    rl.question('Is Product A a gift? (true/false): ', (giftWrapA) => {
        rl.question('Enter quantity for Product B: ', (quantityB) => {
            rl.question('Is Product B a gift? (true/false): ', (giftWrapB) => {
                rl.question('Enter quantity for Product C: ', (quantityC) => {
                    rl.question('Is Product C a gift? (true/false): ', (giftWrapC) => {
                        giftWrapA = (giftWrapA.toLowerCase() === 'true');
                        giftWrapB = (giftWrapB.toLowerCase() === 'true');
                        giftWrapC = (giftWrapC.toLowerCase() === 'true');
                        const totalA = calculateTotal(priceA, quantityA, giftWrapA);
                        const totalB = calculateTotal(priceB, quantityB, giftWrapB);
                        const totalC = calculateTotal(priceC, quantityC, giftWrapC);
                        const subtotal = totalA + totalB + totalC;
                        const discount = calculateDiscount(quantityA, quantityB, quantityC, subtotal);
                        const shippingFee = calculateShippingFee(quantityA + quantityB + quantityC);
                        const giftWrapFee = calculateGiftWrapFee(quantityA, giftWrapA) +
                                            calculateGiftWrapFee(quantityB, giftWrapB) +
                                            calculateGiftWrapFee(quantityC, giftWrapC);
                        const total = subtotal - discount + shippingFee + giftWrapFee;
                        console.log(`\nProduct A: Quantity = ${quantityA}, Total = $${totalA}`);
                        console.log(`Product B: Quantity = ${quantityB}, Total = $${totalB}`);
                        console.log(`Product C: Quantity = ${quantityC}, Total = $${totalC}`);
                        console.log(`\nSubtotal: $${subtotal}`);
                        console.log(`Discount: $${discount}`);
                        console.log(`Shipping Fee: $${shippingFee}`);
                        console.log(`Gift Wrap Fee: $${giftWrapFee}`);
                        console.log(`Total: $${total}`);
                        rl.close();
                    });
                });
            });
        });
    });
});
