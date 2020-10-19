
var commonsFilters = {

   capitalize (value) {
    if (!value) return ''
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value
  },

  priceFormatter (value) {
    if (value === 0) { value = '0.00' }
    if (!value) return ''
    value = parseFloat(value).toFixed(2).toString().replace('.', ',') + ' €'
    return value
  },

  priceFormatterWithDiscount (value) {
    if (!value) return ''
    value = value * 0.85;
    value = Math.round((value + Number.EPSILON) * 100) / 100;
    value = parseFloat(value).toFixed(2).toString().replace('.', ',') + ' €'
    return value
  },

  currencyFormatter (currency) {
    if (!currency) return ''
    if (currency === 'eur') { currency = '€' }
    if (currency === 'usd') { currency = '$' }
    if (currency === 'cad') { currency = '$CAD' }
    if (currency === 'chf') { currency = 'CHF' }
    return currency
  },

  dateUnitFormatter (unit) {
    if (!unit) return ''
    if (unit.toLowerCase() === 'day') { unit = 'jours' }
    if (unit.toLowerCase() === 'days') { unit = 'jours' }
    if (unit.toLowerCase() === 'week') { unit = 'semaines' }
    if (unit.toLowerCase() === 'weeks') { unit = 'semaines' }
    if (unit.toLowerCase() === 'month') { unit = 'mois' }
    if (unit.toLowerCase() === 'months') { unit = 'mois' }
    if (unit.toLowerCase() === 'year') { unit = 'années' }
    if (unit.toLowerCase() === 'years') { unit = 'années' }
    return unit
  },

  statusRecharge (unit) {
    if (!unit) return ''
    if (unit === 'SUCCESS') { unit = 'Confirmée' }
    if (unit === 'CANCELLED') { unit = 'Annulée' }
    if (unit === 'QUEUED') { unit = 'En attente' }
    if (unit === 'ERROR') { unit = 'Erreur dans la commande' }
    if (unit === 'REFUNDED') { unit = 'Remboursée' }
    if (unit === 'SKIPPED') { unit = 'Mise de côté' }
    return unit
  },

  cleanTitleSubscription (unit) {
    if (!unit) return ''
    return unit.replace('Abonnement: ','');
  },

  toSingular (unit) {
    if (!unit) return ''
    unit = unit.substring(0, unit.length - +(unit.lastIndexOf('s')==unit.length-1));
    return unit
  },

  dateFormatter (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (general_config.date_format === "yyyy-mm-dd") { date = [year, month, day].join('-') }
    if (general_config.date_format === "dd-mm-yyyy") { date = [day, month, year].join('-') }
    if (general_config.date_format === "dd/mm/yyyy") { date = [day, month, year].join('/') }
    return date
  },

  dateFormatterLong (date) {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    var d = new Date(date),
        month = monthNames[d.getMonth()],
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (day.length < 2)
        day = '0' + day;
    date = day + ' ' + month + ' ' + year
    return date
  },

  dateFormatterRecharge (date) {
    date = new Date(date);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return year+'-' + month + '-'+dt;
  },

  dateTimeFormatter (date) {
    var d = new Date(date),
        hour = '' + (d.getHours()),
        min = '' + (d.getMinutes()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (general_config.date_time_format === "yyyy-mm-dd hh:mm") { date = [year, month, day].join('-') + ' ' + [hour, min].join(':') }
    if (general_config.date_time_format === "dd-mm-yyyy") { date = [day, month, year].join('-') }
    if (general_config.date_time_format === "dd/mm/yyyy") { date = [day, month, year].join('/') }
    return date
  }
}

