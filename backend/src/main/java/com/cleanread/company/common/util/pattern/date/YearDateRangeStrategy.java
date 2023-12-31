package com.cleanread.company.common.util.pattern.date;

import com.cleanread.company.common.util.DateUtil;

/**
 * @project: backend
 */
public class YearDateRangeStrategy implements Range {
    @Override
    public DateRange getDateRange() {
        return new DateRange(DateUtil.getBeginYear(), DateUtil.getEndYear());
    }
}
