wagon_wheel_query = """
    SELECT
    CASE
    WHEN zop.field_direction=0 THEN 0
    WHEN zop.field_direction<=45 THEN 2
    WHEN zop.field_direction<=90 THEN 1
    WHEN zop.field_direction<=135 THEN 8
    WHEN zop.field_direction<=180 THEN 7
    WHEN zop.field_direction<=225 THEN 6
    WHEN zop.field_direction<=270 THEN 5
    WHEN zop.field_direction<=315 THEN 4
    WHEN zop.field_direction<=360 THEN 3
    END AS `field_zone`,

    CONCAT(YEAR(MIN(x.start_date)), '-', YEAR(MAX(IFNULL(x.end_date,x.start_date)))) AS `span`, COUNT(DISTINCT x.match_id) AS `matches`,
    COUNT(DISTINCT z.match_id, z.innings_number) AS `innings`,
    SUM(z.runs_off_bat=0) AS `dots`, SUM(z.runs_off_bat=1) AS `ones`,
    SUM(z.runs_off_bat=2) AS `twos`,
    SUM(z.runs_off_bat=3) AS `threes`,
    SUM(z.runs_off_bat=4) AS `fours`,
    SUM(z.runs_off_bat=5) AS `fives`,
    SUM(z.runs_off_bat=6) AS `sixes`,
    SUM(z.runs_off_bat>=7) AS `seven_plus`,
    SUM(z.runs_off_bat) AS `runs_off_bat`,
    SUM(z.wides=0) AS `balls_faced`,
    TRUNCATE(100*SUM(z.runs_off_bat)/SUM(z.wides=0) + 1e-10,2) AS `batting_strike_rate`,
    IFNULL(SUM(bdis.is_out AND z.batting_player_id=z.out_player_id),0) AS `striker_wickets`,
    TRUNCATE(SUM(z.runs_off_bat)/SUM(bdis.is_out AND z.batting_player_id=z.out_player_id) + 1e-10,2) AS `batting_average`,
    TRUNCATE(100*SUM(z.runs_off_bat=0)/SUM(z.wides=0) + 1e-10,1) AS `batting_dot_percent`,
    TRUNCATE(100*SUM(z.is_boundary AND z.runs_off_bat IN (4,6))/SUM(z.wides=0) + 1e-10,1) AS `batting_boundary_percent`

    FROM mat_player x

    INNER JOIN bbb_ball z ON x.player_id=z.batting_player_id AND x.match_id=z.match_id
    INNER JOIN bbb_tracking zz ON z.join_key = zz.join_key
    INNER JOIN cvfeed.opta_c50_ball zop ON z.join_key=zop.join_key
    LEFT JOIN zlu_dismissal bdis ON z.dismissal_id=bdis.id

    WHERE
    z.batting_player_id = 12332
    AND
    x.general_class_id IN (4, 5, 6)
	GROUP BY x.player_id,
    CASE WHEN zop.field_direction=0
    THEN 0 WHEN zop.field_direction<=45
    THEN 2 WHEN zop.field_direction<=90
    THEN 1 WHEN zop.field_direction<=135
    THEN 8 WHEN zop.field_direction<=180
    THEN 7 WHEN zop.field_direction<=225
    THEN 6 WHEN zop.field_direction<=270
    THEN 5 WHEN zop.field_direction<=315
    THEN 4 WHEN zop.field_direction<=360
    THEN 3 END

    ORDER BY MIN(z.sort_key) ASC
"""
