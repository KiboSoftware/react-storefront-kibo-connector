import getClient from '../../util/client'
import mutation from './configureProduct-mutation'

function getConfigureVariables(productCode, options={}, quantity=1) {
    const variantOptions = Object.keys(options)
            .filter(key => options[key])
            .map(key => {
                return {
                    attributeFQN: `tenant~${key}`, 
                    value: options[key]
                }
    })
    return {
        productCode,
        quantity,
        selectedOptions: {
            options: variantOptions
        }
    }
}

async function fetchVariant(productCode, options) {
    // const rawData = await fetchWithGraphQl({
    //     query: mutation, 
    //     variables: getConfigureVariables(productCode, options)
    // })
    const rawData = await getClient({
        query: mutation, 
        variables: getConfigureVariables(productCode, options)
    })
    return rawData
}

export default fetchVariant
