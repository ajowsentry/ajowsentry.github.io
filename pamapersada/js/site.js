window.jwtDecode = function (token) {
    let parts = token.split('.');
    if (parts.length != 3) {
        return false;
    }

    try {
        let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        let json = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(json);

    }
    catch {
        return false;
    }
}