export function calculateDiscountedPrice(originalPrice, discountPercentage) {
    // Calculate the discount amount
    let discountAmount = (originalPrice * discountPercentage) / 100;
    
    // Calculate the final price after discount
    let discountedPrice = originalPrice - discountAmount;
    
    return discountedPrice;
}