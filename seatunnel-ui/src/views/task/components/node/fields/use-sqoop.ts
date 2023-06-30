/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCustomParams, useSourceType, useTargetType } from '.'
import type { IJsonItem, ModelType } from '../types'

export function useSqoop(
  model: { [field: string]: any },
  updateValue?: (value: any, field: string) => void
): IJsonItem[] {
  const { t } = useI18n()
  const unCustomSpan = computed(() => (model.isCustomTask ? 0 : 24))

  watch(
    () => model.isCustomTask,
    () => {
      const sqlHandlers =
        model.srcQueryType === '1'
          ? [{ key: 'script', name: t('project.node.sql_statement') }]
          : []
      const handlers = model.isCustomTask
        ? [{ key: 'script', name: t('project.node.script') }]
        : sqlHandlers
      if (updateValue) {
        updateValue(
          {
            ...model,
            handlers,
            language: model.isCustomTask ? 'script' : 'sql',
            script: ''
          },
          'batch'
        )
      }
    }
  )

  watch(
    () => model.srcQueryType,
    () => {
      const handlers =
        model.srcQueryType === '1'
          ? [{ key: 'script', name: 'project.node.sql_statement' }]
          : []
      if (updateValue) {
        updateValue(
          {
            ...model,
            handlers,
            language: 'sql',
            script: ''
          },
          'batch'
        )
      }
    }
  )

  return [
    {
      type: 'switch',
      field: 'isCustomTask',
      name: t('project.node.custom_job')
    },
    {
      type: 'input',
      field: 'jobName',
      name: t('project.node.sqoop_job_name'),
      span: unCustomSpan,
      props: {
        placeholder: t('project.node.sqoop_job_name_tips')
      },
      validate: {
        trigger: ['input', 'blur'],
        required: true,
        validator(validate, value) {
          if (!model.isCustomTask && !value) {
            return new Error(t('project.node.sqoop_job_name_tips'))
          }
        }
      }
    },
    {
      type: 'select',
      field: 'modelType',
      name: t('project.node.direct'),
      span: unCustomSpan,
      options: MODEL_TYPES
    },
    ...useCustomParams({
      model,
      field: 'hadoopCustomParams',
      name: 'hadoop_custom_params',
      isSimple: true,
      span: unCustomSpan
    }),
    ...useCustomParams({
      model,
      field: 'sqoopAdvancedParams',
      name: 'sqoop_advanced_parameters',
      isSimple: true,
      span: unCustomSpan
    }),
    ...useSourceType(model, unCustomSpan),
    ...useTargetType(model, unCustomSpan),
    {
      type: 'input-number',
      field: 'concurrency',
      name: t('project.node.concurrency'),
      span: unCustomSpan,
      props: {
        placeholder: t('project.node.concurrency_tips')
      }
    },
    ...useCustomParams({
      model,
      field: 'localParams',
      name: 'custom_parameters',
      isSimple: true
    })
  ]
}

const MODEL_TYPES = [
  {
    label: 'import',
    value: 'import'
  },
  {
    label: 'export',
    value: 'export'
  }
] as { label: ModelType; value: ModelType }[]