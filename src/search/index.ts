import subcategory from '../subcategory'

export default async function search(params, req, res) {

    return await subcategory(params, req, res);
}