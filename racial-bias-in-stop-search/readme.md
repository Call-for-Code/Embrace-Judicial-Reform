# The Solution:
A Website where citizens, policy makers and the HR dept of police can track racial bias in stop and search decisions. The website will have insights like stop rates, search rates, arrest rates, outcome analysis, threshold analysis and the time-series trend analysis. 

## Who are the users:
1. Citizens - They can use this website to decide how inclusive and safe a particular area is based on the charts and analysed statistical results. For ex: If I have 2 locations to rent a house, accept the job offer etc, I would choose the one where there is no/less racial discrimination.

2. Policy makers - The trend (a sudden spike) can be used by law enforcement agencies for addressing surfaced issues within a given time-frame (ex: 14 days).

Policy makers can also use this as a guide for future proposals in order to make the society more inclusive by bringing a policy reform to reduce the racial bias in stop and search decisions.

3. H.R dept of police - HR police departments can identify possible bias against minority communities. Then use this as input for relevant actions against the particular biased police officer.

## Advantages:
- Transparency in the implementation and outcome of policies brought upon to curb racial discrimination.

- This encourages the collection and analysis of data in order to spot and prevent discriminatory behavior.

## Background:

This analysis is based on the [open-policing](https://5harad.com/papers/100M-stops.pdf) project from the Standford University.

### Assessing bias in traffic stop decisions
The analysis in the notebook and the preliminary UI design provides a good starting point to continue the research to explore the racial bias in the traffic stop decisions. 

During the analysis, it was found that black drivers were, on average, stopped more often than white drivers. However, they do not provide strong evidence of racially disparate treatment since a simple analysis excludes the amount of time spent on the road and adherence to traffic laws. People spending more time on road are more susceptible to the stop and search which is not considered in the above conclusion. 

### Assessing bias in search decisions
An investigation was carried out to examine potential bias in the search decisions after someone has been stopped. Among stopped drivers, it was found that black and Hispanic individuals were, on average, searched more often than white individuals. However, as with differences in stop rates, the disparities we see in search rates are not necessarily the product of discrimination. Black and Hispanic drivers might, hypothetically, carry contraband at higher rates than white drivers, and so elevated search rates may result from routine police work even if no racial bias were present. To measure the role of race in search decisions, following statistical strategies were applied: outcome analysis and threshold analysis.  

Stopped black and Hispanic drivers were searched about twice as often as stopped white drivers. To assess whether this gap resulted from biased decision-making, the outcome test was applied. The outcome test is based not on the search rate but on the ‘hit rate’: the proportion of searches that successfully turn up contraband. Becker argued that even if minority drivers are more likely to carry contraband, in the absence of discrimination, searched minorities should still be found to have contraband at the same rate as searched whites. If searches of minorities are successful less often than searches of whites, it suggests that officers are applying a double standard, searching minorities on the basis of less evidence.


To mitigate the limitations of outcome tests, the threshold test has been proposed as a more robust means for detecting discrimination. This test aims to estimate race-specific probability thresholds above which officers search drivers—for example, the 10% threshold in the hypothetical situation above. Even if two race groups have the same observed hit rate, the threshold test may find that one group is searched on the basis of less evidence, indicative of discrimination. To accomplish this task, the test uses a Bayesian model to simultaneously estimate race-specific search thresholds and risk distributions that are consistent with the observed search and hit rates across all jurisdictions. The threshold test can thus be seen as a hybrid between outcome and benchmark analysis, as detailed in Methods.

It was observed that the threshold test indicates that the bar for searching black and Hispanic drivers is generally lower than that for searching white drivers across the municipal police departments and states we consider. Compared to by-location hit rates, the threshold test more strongly suggests discrimination against black drivers, particularly for municipal stops

The threshold test provides evidence of racial bias in search decisions. However, as with all tests of discrimination, it is important to acknowledge limits in what one can conclude from such statistical analysis per se. For example, if search policies differ not only across, but also within, the geographic subdivisions we consider, then the threshold test might mistakenly indicate discrimination where there is none. Additionally, if officers disproportionately suspect more serious criminal activity when searching black and Hispanic drivers compared to white drivers (for example, possession of larger quantities of contraband), then lower observed thresholds may stem from non-discriminatory police practices. Finally, we note that thresholds cannot be identified by the observed data alone, and so inferences are dependent on the specific functional form of the underlying Bayesian model, including the prior distributions.

## Recommendations and further research
1. Create different user experiences for different user persona: citizen, policy-makers, HR police

2. Drill down on the analysis for individual police officers and observe the time-series, the stop rates, hit rates and the threshold rates for different races. You might be able to provide recommendation for relevant actions(hiring, firing, remediation, etc.) based on this data. The end user persona for this platform would be the HR department of the police. 

3. Incorporate the trends analysis on the U.I
