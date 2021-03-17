export const getTimeArr = (now = new Date()): number[] => {
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  return [
    ...toArr(h),
    ...toArr(m),
    ...toArr(s)
  ]
}

export const toArr = (n: number): Array<number> => {
  return n >= 10 ? ('' + n).split('').map(item => Number(item)) : [0, n]
}

export const getDate = (time?: Date | number | string, cFormat?: string): string => {
  if (!time) {
    time = new Date()
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // 支持苹果端 safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatlocation: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatlocation[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}

interface Weather {
  location?: string,
  city?: string,
  temp?: string | number,
  icon?: string | number,
  text?: string,
  errorMsg?: string
}
