/**
 * Copyright 1996-2014 FoxBPM ORG.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author ych
 */
package org.foxbpm.engine.test.api;

import java.util.List;

import org.foxbpm.engine.identity.User;
import org.foxbpm.engine.test.AbstractFoxBpmTestCase;

public class IdentityServiceTest extends AbstractFoxBpmTestCase {
	
	/**
	 * 测试模糊查询用户接口
	 */
	public void testGetUsers(){
		List<User> users = identityService.getUsers("%admi%", null);
		System.out.println(users.size());
		
		users = identityService.getUsers(null, "%管理%");
		System.out.println(users.size());
		
		users = identityService.getUsers(null, null);
		System.out.println(users.size());
		
	}
}