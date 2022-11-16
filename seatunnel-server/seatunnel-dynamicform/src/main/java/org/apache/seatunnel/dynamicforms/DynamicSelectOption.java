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

package org.apache.seatunnel.dynamicforms;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

public class DynamicSelectOption extends AbstractFormSelectOption {
    @Getter
    @Setter
    private String api;

    public DynamicSelectOption(@NonNull String api, @NonNull String label, @NonNull String field) {
        super(label, field);
        this.api = api;
    }
}