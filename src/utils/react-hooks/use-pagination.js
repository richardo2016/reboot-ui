import React from 'react'

const getMaxPage = (total, pageSize) => {
    return Math.floor(total / pageSize) + ((total % pageSize) > 0 ? 1 : 0)
}

const computePagination = (type, payload, pagination) => {
    const { currentPage, pageSize, total, startPage } = pagination
    const maxPage = getMaxPage(total, pageSize)

    let changeDiff = null
    switch (type) {
        case 'currentPage':
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
                currentPage: Math.min(currentPage + 1, maxPage)
            }
            break
        case 'prevPage':
            changeDiff = {
                currentPage: Math.max(startPage, Math.max(currentPage - 1, 0))
            }
            break
    }

    return changeDiff
}

export default function usePagination(
    initPagi,
) {
    let {
        currentPage = 0,
        pageSize = 20,
        total = 0,
        startPage = 0
    } = initPagi || {}
    initPagi = { currentPage, pageSize, total, startPage }

    if (currentPage < startPage) currentPage = startPage
    
    function getInitialData() {
        return {
            currentPage,
            pageSize,
            total,
            startPage,
            maxPage: getMaxPage(total, pageSize)
        }
    }

    const [ pagination, setPagination ] = React.useState(getInitialData())

    React.useEffect(() => {
        update(initPagi)
    }, [
        initPagi.currentPage,
        initPagi.pageSize,
        initPagi.total
    ])

    const update = (payload) => {
        let nextPagi = { ...payload }
        nextPagi = {
            ...pagination,
            ...nextPagi.currentPage !== undefined && { currentPage: nextPagi.currentPage },
            ...nextPagi.pageSize !== undefined && { pageSize: nextPagi.pageSize },
            ...nextPagi.total !== undefined && { total: nextPagi.total },
        }
        nextPagi.maxPage = getMaxPage(nextPagi.total, nextPagi.pageSize)

        setPagination(nextPagi)
    }

    return [
        pagination,
        update,
        computePagination
    ]
};