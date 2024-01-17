import java.util.Scanner;

public class Task1 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double priceA = 20.0;
        double priceB = 40.0;
        double priceC = 50.0;
        System.out.print("Enter quantity for Product A: ");
        int quantityA = scanner.nextInt();
        System.out.print("Is Product A a gift? (true/false): ");
        boolean giftWrapA = scanner.nextBoolean();

        System.out.print("Enter quantity for Product B: ");
        int quantityB = scanner.nextInt();
        System.out.print("Is Product B a gift? (true/false): ");
        boolean giftWrapB = scanner.nextBoolean();

        System.out.print("Enter quantity for Product C: ");
        int quantityC = scanner.nextInt();
        System.out.print("Is Product C a gift? (true/false): ");
        boolean giftWrapC = scanner.nextBoolean();
        double totalA = calculateTotal(priceA, quantityA, giftWrapA);
        double totalB = calculateTotal(priceB, quantityB, giftWrapB);
        double totalC = calculateTotal(priceC, quantityC, giftWrapC);
        double subtotal = totalA + totalB + totalC;
        double discount = calculateDiscount(quantityA, quantityB, quantityC, subtotal);
        double shippingFee = calculateShippingFee(quantityA + quantityB + quantityC);
        double giftWrapFee = calculateGiftWrapFee(quantityA, giftWrapA) +
                calculateGiftWrapFee(quantityB, giftWrapB) +
                calculateGiftWrapFee(quantityC, giftWrapC);
        double total = subtotal - discount + shippingFee + giftWrapFee;
        System.out.println("\nProduct A: Quantity = " + quantityA + ", Total = $" + totalA);
        System.out.println("Product B: Quantity = " + quantityB + ", Total = $" + totalB);
        System.out.println("Product C: Quantity = " + quantityC + ", Total = $" + totalC);
        System.out.println("\nSubtotal: $" + subtotal);
        System.out.println("Discount: $" + discount);
        System.out.println("Shipping Fee: $" + shippingFee);
        System.out.println("Gift Wrap Fee: $" + giftWrapFee);
        System.out.println("Total: $" + total);
    }

    private static double calculateTotal(double price, int quantity, boolean giftWrap) {
        double total = price * quantity;
        if (giftWrap) {
            total += quantity;
        }
        return total;
    }

    private static double calculateDiscount(int quantityA, int quantityB, int quantityC, double subtotal) {
        double discount = 0;
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

    private static double calculateShippingFee(int totalQuantity) {
        return Math.ceil((double) totalQuantity / 10) * 5;
    }

    private static double calculateGiftWrapFee(int quantity, boolean giftWrap) {
        return giftWrap ? quantity : 0;
    }
}
