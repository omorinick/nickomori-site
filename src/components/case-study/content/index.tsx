import ChurnCaseContent from './churn-case'
import SubstackCaseContent from './substack-case'

export const CASE_STUDY_CONTENT: Record<string, React.ComponentType> = {
  'churn-case': ChurnCaseContent,
  'substack-case': SubstackCaseContent,
}
