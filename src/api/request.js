const Headers = {
    "Content-Type":"application/json"
};

class Request {
    constructor() {
        this.options = {
            headers: Headers
        };
    }

    setHeader(headers) {
        return (this.options.headers = Object.assign({}, this.options.headers, headers));
    }

    get(url, headers = {}) {
        return this.request(url, {}, headers);
    }

    post(url, data, headers = {}) {
        return this.request(url, "POST", headers, data);
    }

    delete(url, data, headers = {}) {
        return this.request(url,'DELETE', headers, data);
    }
    put(url, data, headers={}){
        return this.request(url, 'PUT', headers, data)
    }

    request(url, method = "GET", headers = {}, data = {}) {
        headers = Object.assign({}, this.options.headers, headers);
   
        return new Promise((resolve, reject) => {
            Megalo.request({
                url: url,
                data: data,
                method: method,
                header: headers
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                resolve({code: "error"});
            });
        });
    }
}

export default new Request();
