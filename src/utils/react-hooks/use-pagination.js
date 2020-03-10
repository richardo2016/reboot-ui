import React from 'react'

const computePagination = (type, payload, pagination) => {
    const { page, pageSize, total, startPage } = pagination
    const maxPage = Math.floor(total / pageSize) + ((total % pageSize) > 0 ? 1 : 0)

    let changeDiff = null
    switch (type) {
        case 'page':
        case 'pageSize':
        case 'total':
            changeDiff = {
                [type]: payload
            }
            break
        case 'reset':
            changeDiff = getInitialData()
            break
        case 'nextPage':
            changeDiff = {
                page: Math.min(page + 1, maxPage)
            }
            break
        case 'prevPage':
            changeDiff = {
                page: Math.max(startPage, Math.max(page - 1, 0))
            }
            break
    }

    return changeDiff
}

export default function usePagination(
    initPagi,
) {
    let {
        page = 0,
        pageSize = 20,
        total = 0,
        startPage = 0
    } = initPagi || {}
    initPagi = { page, pageSize, total, startPage }

    if (page < startPage) page = startPage
    
    function getInitialData() {
        return { page, pageSize, total, startPage }
    }

    const [ pagination, setPagination ] = React.useState(getInitialData())

    React.useEffect(() => {
        update(initPagi)
    }, [
        initPagi.page,
        initPagi.pageSize,
        initPagi.total
    ])

    const update = (payload) => {
        const nextPagi = { ...payload }
        setPagination({
            ...pagination,
            ...nextPagi.page !== undefined && { page: nextPagi.page },
            ...nextPagi.pageSize !== undefined && { pageSize: nextPagi.pageSize },
            ...nextPagi.total !== undefined && { total: nextPagi.total },
        })
    }

    return [
        pagination,
        update,
        computePagination
    ]
};