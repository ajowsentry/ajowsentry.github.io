function ApiClient(apiBaseURL) {
    const token = Cookies.get('api-token') ?? localStorage.getItem('authToken');
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'User-Agent': 'agent-pama-admin',
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Strict-Transport-Security": "max-age=31536000",
    };

    async function getAboutPage(lang) {
        let url = `${apiBaseURL}/about?` + new URLSearchParams({ lang });
        return await fetch(url, {
            method: 'GET',
            headers,
        });
    }

    async function postAboutPage(formData) {
        return await fetch(`${apiBaseURL}/about`, {
            method: 'POST',
            headers,
            body: formData,
        });
    }

    async function getHomePage(lang) {
        let url = `${apiBaseURL}/dashboard?` + new URLSearchParams({ lang });
        return await fetch(url, {
            method: 'GET',
            headers,
        });
    }

    async function postHomePage(formData) {
        return await fetch(`${apiBaseURL}/dashboard`, {
            method: 'POST',
            headers,
            body: formData,
        });
    }

    async function getSustainabilityPage(lang) {
        let url = `${apiBaseURL}/sustainability?` + new URLSearchParams({ lang });
        return await fetch(url, {
            method: 'GET',
            headers,
        });
    }

    async function postSustainabilityPage(formData) {
        return await fetch(`${apiBaseURL}/sustainability`, {
            method: 'POST',
            headers,
            body: formData,
        });
    }

    async function getHistory(lang) {
        let url = `${apiBaseURL}/history?` + new URLSearchParams({ lang });
        return await fetch(url, {
            method: 'GET',
            headers,
        });
    }

    async function getOperationalPhotos(id) {
        let url = `${apiBaseURL}/operational-area/photos/` + id;
        return await fetch(url, {
            method: 'GET',
            headers,
        });
    }

    async function allUser() {
        let url = `${apiBaseURL}/backoffice/user/all`;
        return await fetch(url, {
            method: 'GET',
            headers,
        });
    }

    async function postUser(formData) {
        return await fetch(`${apiBaseURL}/auth/register`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    }

    async function deleteUser(id) {
        return await fetch(`${apiBaseURL}/backoffice/user/delete/${id}`, {
            method: 'DELETE',
            headers,
        });
    }

    async function putUser(id, formData) {
        return await fetch(`${apiBaseURL}/auth/update/user/${id}`, {
            method: 'PUT',
            headers: {...headers, 'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });
    }

    async function postHistory(formData) {
        return await fetch(`${apiBaseURL}/history`, {
            method: 'POST',
            headers,
            body: formData,
        });
    }

    async function changePassword(formData) {
        return await fetch(`${apiBaseURL}/auth/change-password`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    }

    async function fileProxy(url, contentType) {
        contentType ??= 'image/png';
        return await fetch(`/Proxy?url=${url}&content-type=${contentType}`);
    }

    const crudDefinition = [
        { name: 'Visi', path: 'visi', sort: 'sort' },
        { name: 'Misi', path: 'misi', sort: 'sort' },
        { name: 'OurService', path: 'our-service' },
        { name: 'Portfolio', path: 'portfolio' },
        { name: 'CompanyValue', path: 'company-value' },
        { name: 'Award', path: 'award' },
        { name: 'Booklet', path: 'booklet', sort: false },
        { name: 'Elearning', path: 'elearning', sort: false },
        { name: 'Organization', path: 'organization' },
        { name: 'OrganizationPosition', path: 'organization-position' },
        { name: 'Publication', path: 'publication', sort: false },
        { name: 'Journey', path: 'journey', sort: false },
        { name: 'Media', path: 'media', sort: false },
        { name: 'MediaCategory', path: 'media-category', sort: false },
        { name: 'Pers', path: 'pers', sort: false },
        { name: 'Seo', path: 'seo', sort: false },
        { name: 'Menu', path: 'menu', sort: false },
        { name: 'Contact', path: 'contact', sort: false },
        { name: 'Dictionary', path: 'dictionary', sort: false },
        { name: 'SustainabilityItem', path: 'sustainability-item', sort: 'Sequence', isAscending: false },
        { name: 'SustainabilityItemDetail', path: 'sustainability-item-detail', sort: 'Sequence', isAscending: false },
        { name: 'OperationalArea', path: 'operational-area', sort: false },
        { name: 'OperationalAreaPhotos', path: 'operational-area/photos', sort: false, hasGet: false },
    ];

    let crudApi = { };

    crudDefinition.forEach(crud => {

        if (crud.hasGet ?? true)
        crudApi['get' + crud.name] = async function (page) {
            let params = { PageNumber: page, PageSize: 20 };
            let sort = crud.sort ?? 'Sort';
            if (sort) {
                params.SortBy = sort;
                params.IsSortAscending = crud.isAscending ?? true;
            }

            let url = `${apiBaseURL}/${crud.path}/page?` + new URLSearchParams(params);
            return await fetch(url, {
                method: 'GET',
                headers,
            });
        }

        crudApi['all' + crud.name] = async function () {
            let url = `${apiBaseURL}/${crud.path}/all`;
            return await fetch(url, {
                method: 'GET',
                headers,
            });
        }

        crudApi['post' + crud.name] = async function (formData) {
            return await fetch(`${apiBaseURL}/${crud.path}`, {
                method: 'POST',
                headers,
                body: formData,
            });
        }

        crudApi['put' + crud.name] = async function (id, formData) {
            return await fetch(`${apiBaseURL}/${crud.path}/${id}`, {
                method: 'PUT',
                headers,
                body: formData,
            });
        }

        crudApi['delete' + crud.name] = async function (id) {
            return await fetch(`${apiBaseURL}/${crud.path}/${id}`, {
                method: 'DELETE',
                headers,
            });
        }
    });

    return {
        postHomePage,
        getHomePage,
        postAboutPage,
        getAboutPage,
        getSustainabilityPage,
        postSustainabilityPage,
        getHistory,
        postHistory,
        fileProxy,
        getOperationalPhotos,
        allUser,
        postUser,
        putUser,
        deleteUser,
        changePassword,
        ...crudApi,
    };
}