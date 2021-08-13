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
        includeOptionDetails: true,
        selectedOptions: {
            options: variantOptions
        }
    }
}

async function fetchVariant(productCode, options, req, res) {
    const client = getClient(req,res)
    const rawData = await client.mutate({
        mutation: mutation, 
        variables: getConfigureVariables(productCode, options)
    })
    console.log("------------rawdata variant-------------", rawData)
    return rawData
}

export default fetchVariant
