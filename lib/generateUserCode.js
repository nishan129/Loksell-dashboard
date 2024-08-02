export function generateUserCode(prefix, fullName) {
    // Extract initials from the full name
    const initials = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
    
    // Get the current timestamp
    const now = new Date();
    const timestamp = now.getFullYear().toString().slice(-2) + 
                      String(now.getMonth() + 1).padStart(2, '0') + 
                      String(now.getDate()).padStart(2, '0') + 
                      String(now.getHours()).padStart(2, '0') + 
                      String(now.getMinutes()).padStart(2, '0') + 
                      String(now.getSeconds()).padStart(2, '0');

    // Generate the unique code
    const userCode = `${prefix}-${initials}-${timestamp}`;

    return userCode;
}
