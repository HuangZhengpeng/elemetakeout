import Vue from "vue"
import { format } from 'date-fns'

Vue.filter("date-format",function(date, format='yyyy-MM-dd'){
    return format(date, format)
})

//new Date() | "date-format"